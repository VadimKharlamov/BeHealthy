using BeHealthy.API.Contracts;
using BeHealthy.Application.Services;
using BeHealthy.Core;
using BeHealthy.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeHealthy.API.Endpoints;
public static class MedsEndpoints
{
    public static IEndpointRouteBuilder MapMedsEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapPost("createMed/", CreateMed);

        app.MapGet("getMeds/{userId:guid}", GetMeds);

        app.MapPut("updateMed/{id:guid}", UpdateMeds);

        app.MapDelete("deleteMed/{id:guid}", DeleteMed);

        return app;
    }
    private static async Task<IResult> GetMeds([FromRoute] Guid userId, MedsService medsService, HttpContext context)
    {
        var meds = await medsService.GetAllUserMeds(userId);

        var response = meds.Select(b => new MedsResponse(b.Id, b.UserId, b.HistoryId, b.Title, b.Description, b.Count, b.TakeType, b.CountType, b.TakeTime));

        return Results.Ok(response);
    }
    private static async Task<IResult> CreateMed([FromBody] MedsRequest request, MedsService medsService)
    {
        var (med, error) = Med.Create(
            Guid.NewGuid(),
            request.UserId,
            Guid.NewGuid(),
            request.Title,
            request.Description,
            request.Count,
            request.TakeType,
            request.CountType,
            request.TakeTime);
        if (!string.IsNullOrEmpty(error))
        {
            return Results.BadRequest(error);
        }
        var createdMed = await medsService.CreateMed(med);
        return Results.Ok(createdMed);

    }

    private static async Task<IResult> UpdateMeds([FromRoute] Guid id, [FromBody] MedsRequest request, MedsService medsService)
    {
        var medId = await medsService.UpdateMed(id, request.Title, request.Description, request.Count, request.TakeType,
            request.CountType, request.TakeTime);

        return Results.Ok(medId);
    }

    private static async Task<IResult> DeleteMed([FromRoute] Guid id, MedsService medsService)
    {
        var medId = await medsService.DeleteMed(id);

        return Results.Ok(medId);
    }
}
