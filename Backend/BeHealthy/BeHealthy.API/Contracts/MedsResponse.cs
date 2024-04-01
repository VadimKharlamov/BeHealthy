namespace BeHealthy.API.Contracts;

public record MedsResponse(
    Guid Id,
    Guid UserId,
    Guid HistoryId,
    string Title,
    string Description,
    int Count,
    int TakeType,
    int CountType,
    List<DateTime> TakeTime);
