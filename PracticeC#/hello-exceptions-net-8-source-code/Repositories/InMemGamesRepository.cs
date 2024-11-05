using HelloExceptions.Entities;

namespace HelloExceptions.Repositories;

public class InMemGamesRepository : IGamesRepository
{
    private readonly List<Game> games =
    [
        new Game(1, "Street Fighter II", 19.99M),
        new Game(2, "Final Fantasy XIV", 59.99M),
        new Game(3, "FIFA 23", 69.99M)
    ];

    public Task<IEnumerable<Game>> GetAllAsync()
    {
        //return await Task.FromResult(games);
        throw new InvalidOperationException("The database connection is closed!");
    }

    public async Task<Game?> GetAsync(int id)
    {        
        if (id < 1)
        {
            throw new ArgumentOutOfRangeException(nameof(id), "The id must be greater than 0!");
        }
        
        return await Task.FromResult(games.Find(game => game.Id == id));
    }
}