# Menggunakan base image Node.js 20 di Alpine Linux
FROM node:20-alpine

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada) ke dalam container
COPY package.json package-lock.json /app/

# Menjalankan perintah npm install untuk menginstal dependensi
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Menjalankan aplikasi ketika container dijalankan
CMD ["npm", "run","dev"]

# Mengekspose port yang akan digunakan oleh aplikasi
EXPOSE 3000
