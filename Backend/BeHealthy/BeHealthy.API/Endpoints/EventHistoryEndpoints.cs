using BeHealthy.API.Contracts;
using BeHealthy.Application.Services;
using BeHealthy.Core;
using BeHealthy.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeHealthy.API.Endpoints;
public static class EventHistoryEndpoints
{
    public static IEndpointRouteBuilder MapEventHistoryEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapPost("createEventHistory/", CreateEventHistory);

        app.MapGet("getEventsHistory/{userId:guid}", GetEventHistory);

        app.MapPut("updateEventHistory/{id:guid}", UpdateEventHistory);

        app.MapDelete("deleteEventHistory/{id:guid}", DeleteEventHistory);

        return app;
    }
    private static async Task<IResult> GetEventHistory([FromRoute] Guid userId, EventHistoryService eventHistoryService, HttpContext context)
    {
        var eventHistory = await eventHistoryService.GetUserEventHistory(userId);

        var response = eventHistory.Select(b => new EventHistoryResponse(b.Id, b.UserId, b.Title, b.Description, b.VisitTime,
            b.Direction, b.DoctorName, b.DoctorPhone, b.ClinicName, b.ClinicPhone, b.Address));

        return Results.Ok(response);
    }
    private static async Task<IResult> CreateEventHistory([FromBody] EventHistoryRequest request, EventHistoryService eventHistoryService)
    {
        var (eventHistory, error) = EventHistory.Create(
            request.Id,
            request.UserId,
            request.Title,
            request.Description,
            request.VisitTime,
            request.Direction,
            request.DoctorName,
            request.DoctorPhone,
            request.ClinicName,
            request.ClinicPhone,
            request.Address);
        if (!string.IsNullOrEmpty(error))
        {
            return Results.BadRequest(error);
        }
        await eventHistoryService.CreateEventHistory(eventHistory);
        return Results.Ok();

    }

    private static async Task<IResult> UpdateEventHistory([FromRoute] Guid id, [FromBody] EventHistoryRequest request, EventHistoryService eventHistoryService)
    {
        var eventHistoryId = await eventHistoryService.UpdateEventHistory(id, request.Title, request.Description, request.VisitTime, request.Direction,
            request.DoctorName, request.DoctorPhone, request.ClinicName, request.ClinicPhone, request.Address);

        return Results.Ok(eventHistoryId);
    }

    private static async Task<IResult> DeleteEventHistory([FromRoute] Guid id, EventHistoryService eventHistoryService)
    {
        var eventHistoryId = await eventHistoryService.DeleteEventHistory(id);

        return Results.Ok(eventHistoryId);
    }
}
