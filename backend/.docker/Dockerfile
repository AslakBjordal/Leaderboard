FROM mcr.microsoft.com/dotnet/sdk:7.0 as builder

WORKDIR /app

COPY . .

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:7.0

WORKDIR /app

COPY --from=builder /app/out .

ENTRYPOINT [ "dotnet", "backend.dll" ]

