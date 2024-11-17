# PJWD

## Prerequisits

This project uses [Bun](https://bun.sh/) as the JavaScipt/TypeScript virtual machine.

### Install Bun on GNU/Linux or MacOSX

Run the following in a terminal window:

```shell
curl -fsSL https://bun.sh/install | bash
```

### Install Bun on Windows

Run the following in a PowerShell window:

```shell
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Install packages

Runthe following in both the api and frontend directories:

```shell
bun i
```

## Run development environment

It is important to run the api before running the frontend.

### API

In the api subdirectory run the following from the terminal:

```shell
bun run dev
```

### Frontend

In the frontend subdirectory run the following from the terminal:

```shell
bun run dev
```

## Run preview (production build)

It is important to run the api before running the frontend.

### API

In the api subdirectory run the following from the terminal:

```shell
bun run build
bun run preview
```

### Frontend

In the frontend subdirectory run the following from the terminal:

```shell
bun run build
bun run preview
```

## UI URLs

The api provides a Swagger UI on http://localhost:3000/swagger.

The dev frontend is available on http://localhost:5173 and the preview (build) frontend is available on http://localhost:4173.
