namespace BeHealthy.Core.Models;

public class Med
{

    public static int MAX_TITLE_LENGTH = 50;
    private Med(Guid id, Guid userId, Guid historyId, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime)
    {
        Id = id;
        UserId = userId;
        HistoryId = historyId;
        Title = title;
        Description = description;
        Count = count;
        TakeType = takeType;
        CountType = countType;
        TakeTime = takeTime;
    }

    public Guid Id { get; private set; }

    public Guid UserId { get; private set; }

    public Guid HistoryId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public int Count { get; private set; } = 0;

    public int TakeType { get; private set; } = 0;

    public int CountType { get; private set; } = 0;

    public List<DateTime> TakeTime { get; private set; } = new List<DateTime>();

    public static (Med med, string Error) Create(Guid id, Guid userId, Guid historyId, string title, string description, int count, int takeType, int countType, List<DateTime> takeTime)
    {
        var error = string.Empty;

        if (string.IsNullOrEmpty(title) || title.Length > 50)
        {
            error = "Title can not be empty or longer than 50 symbols";
        }
        if (count <= 0)
        {
            error = "Count can not be less or equal zero";
        }
        if (takeTime.Count < 1)
        {
            error = "No time data";
        }
        var med = new Med(id, userId, historyId, title, description, count, takeType, countType, takeTime);
        return (med, error);
    }
}
