
const env=(import.meta.env)
const envirnment={
    app_name:(env.VITE_APP_NAME||'my app').replaceAll(' ','_'),
    secret_key:env.VITE_SECRET_KEY,
    api:env.VITE_API_URL,
    image_path:env.VITE_IMAGE_PATH
}
export default envirnment