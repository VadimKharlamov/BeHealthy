namespace BeHealthy.API.Contracts;

public record MedHistoryResponse(
    Guid Id,
    Guid UserId,
    string Title,
    string Description,
    int Count,
    int CountType,
    List<DateTime> TakeTime);
