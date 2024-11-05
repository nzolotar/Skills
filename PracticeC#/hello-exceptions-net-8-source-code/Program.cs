using HelloExceptions;
using HelloExceptions.Entities;
using HelloExceptions.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IGamesRepository, InMemGamesRepository>()
                .AddProblemDetails()
                .AddExceptionHandler<GlobalExceptionHandler>();
                
var app = builder.Build();

app.UseStatusCodePages();
app.UseExceptionHandler();

app.MapGet("/games", async (IGamesRepository repository) =>
{
    IEnumerable<Game> games = await repository.GetAllAsync();
    return Results.Ok(games.Select(game => game.ToDto()));
});

app.MapGet("/games/{id}", async (IGamesRepository repository, int id) =>
{
    Game? game = await repository.GetAsync(id);
    return game is not null ? Results.Ok(game.ToDto()) : Results.NotFound();
});

app.Run();