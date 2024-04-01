using BeHealthy.API.Contracts;
using BeHealthy.Application.Services;
using BeHealthy.Core;
using BeHealthy.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeHealthy.API.Endpoints;
public static class MedEventsEndpoints
{
    public static IEndpointRouteBuilder MapMedEventsEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapPost("createEvent/", CreateMedEvent);

        app.MapGet("getEvents/{userId:guid}", GetMedEvents);

        app.MapPut("updateEvent/{id:guid}", UpdateMedEvent);

        app.MapDelete("deleteEvent/{id:guid}", DeleteMedEvent);

        return app;
    }
    private static async Task<IResult> GetMedEvents([FromRoute] Guid userId, MedEventService medEventService, HttpContext context)
    {
        var medEvents = await medEventService.GetAllUserMedEvents(userId);

        var response = medEvents.Select(b => new MedEventResponse(b.Id, b.UserId, b.HistoryId, b.Title, b.Description, b.VisitTime,
            b.Direction, b.DoctorName, b.DoctorPhone, b.ClinicName, b.ClinicPhone, b.Address));

        return Results.Ok(response);
    }
    private static async Task<IResult> CreateMedEvent([FromBody] MedEventsRequest request, MedEventService medEventService)
    {
        var (medEvent, error) = MedEvent.Create(
            Guid.NewGuid(),
            request.UserId,
            Guid.NewGuid(),
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
        var createdEvent = await medEventService.CreateMedEvent(medEvent);
        return Results.Ok(createdEvent);

    }

    private static async Task<IResult> UpdateMedEvent([FromRoute] Guid id, [FromBody] MedEventsRequest request, MedEventService medEventService)
    {
        var medEventId = await medEventService.UpdateMedEvent(id, request.Title, request.Description, request.VisitTime, request.Direction,
            request.DoctorName, request.DoctorPhone, request.ClinicName, request.ClinicPhone, request.Address);

        return Results.Ok(medEventId);
    }

    private static async Task<IResult> DeleteMedEvent([FromRoute] Guid id, MedEventService medEventService)
    {
        var medEventId = await medEventService.DeleteMedEvent(id);

        return Results.Ok(medEventId);
    }
}
