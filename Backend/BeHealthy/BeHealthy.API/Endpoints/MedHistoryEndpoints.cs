using BeHealthy.API.Contracts;
using BeHealthy.Application.Services;
using BeHealthy.Core;
using BeHealthy.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeHealthy.API.Endpoints;
public static class MedHistoryEndpoints
{
    public static IEndpointRouteBuilder MapMedHistoryEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapPost("createMedHistory/", CreateMedHistory);

        app.MapGet("getMedHistory/{userId:guid}", GetMedHistory);

        app.MapPut("updateMedHistory/{id:guid}", UpdateMedHistory);

        app.MapDelete("deleteMedHistory/{id:guid}", DeleteMedHistory);

        return app;
    }
    private static async Task<IResult> GetMedHistory([FromRoute] Guid userId, MedHistoryService medHistoryService, HttpContext context)
    {
        var medHistory = await medHistoryService.GetUserMedHistory(userId);

        var response = medHistory.Select(b => new MedHistoryResponse(b.Id, b.UserId, b.Title, b.Description, b.Count, b.CountType, b.TakeTime));

        return Results.Ok(response);
    }
    private static async Task<IResult> CreateMedHistory([FromBody] MedHistoryRequest request, MedHistoryService medHisotryService)
    {
        var (medHistory, error) = MedHistory.Create(
            request.Id,
            request.UserId,
            request.Title,
            request.Description,
            request.Count,
            request.CountType,
            request.TakeTime);
        if (!string.IsNullOrEmpty(error))
        {
            return Results.BadRequest(error);
        }
        await medHisotryService.CreateMedHistory(medHistory);
        return Results.Ok();

    }

    private static async Task<IResult> UpdateMedHistory([FromRoute] Guid id, [FromBody] MedHistoryRequest request, MedHistoryService medHistoryService)
    {
        var medHistoryId = await medHistoryService.UpdateMedHistory(id, request.Title, request.Description, request.Count,
            request.CountType, request.TakeTime);

        return Results.Ok(medHistoryId);
    }

    private static async Task<IResult> DeleteMedHistory([FromRoute] Guid id, MedHistoryService medHistoryService)
    {
        var medHistoryId = await medHistoryService.DeleteMedHistory(id);

        return Results.Ok(medHistoryId);
    }
}
