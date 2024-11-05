using HelloExceptions.Entities;

namespace HelloExceptions.Repositories;

public interface IGamesRepository
{
    Task<IEnumerable<Game>> GetAllAsync();
    Task<Game?> GetAsync(int id);
}