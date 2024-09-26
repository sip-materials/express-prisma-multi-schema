prisma init
prisma generate --schema=./prisma/schema.prisma
prisma db pull --print
prisma db push
prisma db seed
prisma migrate dev --create-only --schema=./prisma/common/schema.prisma