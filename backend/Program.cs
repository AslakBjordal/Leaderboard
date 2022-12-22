using LeaderBoard.Database;
using LeaderBoard.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(new DatabaseConfig { Name = builder.Configuration["DatabaseName"] });

builder.Services.AddHostedService<DatabaseHostedService>();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
  options.Cookie.SameSite = SameSiteMode.None;
  options.LoginPath = new PathString("/Authentication/Login");
  options.SlidingExpiration = true;
  options.Events.OnRedirectToLogin = context =>
  {
    context.Response.StatusCode = 401;
    return Task.CompletedTask;
  };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
  app.UseSwaggerUI();
  app.UseSwagger();
// }


app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.UseCors(builder =>
{
  builder
  .WithOrigins("http://localhost:8080")
  //.WithOrigins("https://8ball.bjordal.tech")
  .AllowAnyHeader()
  .AllowCredentials()
  .AllowAnyMethod();
});

app.MapControllers();

app.Run();