var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new
{
    service = "Chronos.Api",
    status = "ok",
    timestamp = DateTime.UtcNow
}));

app.Run();
