using BeHealthy.Core;
using BeHealthy.Persistence;
using BeHealthy.Application;
using Microsoft.EntityFrameworkCore;
using BeHealthy.Application.Services;
using BeHealthy.Persistence.Repositories;
using BeHealthy.Application.Interfaces;
using BeHeathy.Infrastructure;
using BeHeathy.Application;
using BeHealthy.API.Extensions;
using Microsoft.AspNetCore.CookiePolicy;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
builder.Services.AddApiAuthentication(configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<HealthyDbContext>(
    options =>
    {
        options.UseNpgsql(configuration.GetConnectionString(nameof(HealthyDbContext)));
    });
builder.Services.AddScoped<IJwtProvider, JwtProvider>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

builder.Services.AddScoped<IMedRepository, MedRepository>();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IMedEventRepository, MedEventRepository>();
builder.Services.AddScoped<IMedHistoryRepository, MedHistoryRepository>();
builder.Services.AddScoped<IEventHistoryRepository, EventHistoryRepository>();
builder.Services.AddScoped<MedsService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<MedEventService>();
builder.Services.AddScoped<MedHistoryService>();
builder.Services.AddScoped<EventHistoryService>();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(x =>
{
    x.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.WithOrigins("http://localhost:3000");
    });
}
);

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.None,
    HttpOnly = HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.Always
});
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.AddMappedEndpoints();

app.Run();
