using HelloExceptions.Dtos;
using HelloExceptions.Entities;

namespace HelloExceptions;

public static class Extensions
{
    public static GameDto ToDto(this Game game) =>
        new(
            game.Id,
            game.Name,
            game.Price
        );
}