using BeHealthy.API.Contracts;
using BeHealthy.Application.Services;
using BeHealthy.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace BeHealthy.API.Endpoints;

public static class UsersEndpoints
{
    public static IEndpointRouteBuilder MapUsersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("register", Register);

        app.MapPost("login", Login);

        return app;
    }

    private static async Task<IResult> Register(
        [FromBody] RegisterUserRequest request,
        UserService usersService)
    {
        var status = await usersService.Register(request.UserName, request.Email, request.Password);

        if (status)
        {
            return Results.Ok();
        } else
        {
            return Results.BadRequest();
        }

    }

    private static async Task<IResult> Login(
        [FromBody] LoginUserRequest request,
        UserService usersService,
        HttpContext context)
    {
        var token = await usersService.Login(request.Email, request.Password);

        if (token == "NoUser")
        {
            return Results.BadRequest();

        }
        context.Response.Cookies.Append("secretCookie", token);
        var response = new LoginUserResponse(token);
        return Results.Ok(token);


    }
}