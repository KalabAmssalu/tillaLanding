# Stage 1: Build the Next.js app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# new 
# Stage 2: Run the Next.js app
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3001
CMD ["npm", "run", "start"]
