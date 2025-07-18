<template>
  <div class="upload-container">
    <div class="upload-card">
      <h2>Upload Your Image</h2>
      <p class="subtitle">Add an image with a title</p>

      <form @submit.prevent="uploadImage">
        <label for="file">Image File</label>
        <input type="file" @change="onFileChange" />

        <label for="title">Title</label>
        <input v-model="title" placeholder="Type in a title..." required />

        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      title: ''
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    async uploadImage() {
      if (!this.file || !this.title) {
        alert("Please select an image and provide a title");
        return;
      }

      const formData = new FormData();
      formData.append('image', this.file);
      formData.append('title', this.title);

      const token = localStorage.getItem('token');

      const res = await fetch('/api/file/upload-image', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('Image uploaded!');
        console.log(data);
      } else {
        alert('Upload failed');
        console.error(data.error);
      }
    }
  }
};
</script>

<style scoped>
.upload-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f4f6f9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 1rem;
  box-sizing: border-box;
}

.upload-card {
  background: #ffffff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 400px;
  min-height: 380px;
  text-align: center;
}

.upload-card h2 {
  margin-bottom: 0.5rem;
  color: #222;
}

.subtitle {
  margin-bottom: 2rem;
  color: #777;
  font-size: 0.9rem;
}

.upload-card form {
  display: flex;
  flex-direction: column;
}

.upload-card label {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
  text-align: left;
}

.upload-card input[type="file"],
.upload-card input[type="text"],
.upload-card input[type="email"],
.upload-card input[type="password"] {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.upload-card input:focus {
  border-color: #2F7CFF;
  outline: none;
}

.upload-card button[type="submit"] {
  background: #2F7CFF;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.upload-card button[type="submit"]:hover {
  background: #255FCC;
}
</style>