namespace BeHealthy.Core.Models;

public class MedHistory
{

    private MedHistory(Guid id, Guid userId, string title, string description, int count, int countType, List<DateTime> takeTime)
    {
        Id = id;
        UserId = userId;
        Title = title;
        Description = description;
        Count = count;
        CountType = countType;
        TakeTime = takeTime;
    }

    public Guid Id { get; private set; }

    public Guid UserId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public int Count { get; private set; } = 0;

    public int CountType { get; private set; } = 0;

    public List<DateTime> TakeTime { get; private set; } = new List<DateTime>();

    public static (MedHistory medHistory, string Error) Create(Guid id, Guid userId, string title, string description, int count, int countType, List<DateTime> takeTime)
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
        var medHistory = new MedHistory(id, userId, title, description, count, countType, takeTime);
        return (medHistory, error);
    }
}
