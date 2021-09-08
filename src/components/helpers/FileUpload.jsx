
export const fileUpload = async(file) =>{

    //almacenamos la url de la api que deseamos consumir
    const cloudURL = 'https://api.cloudinary.com/v1_1/dkkw68he3/upload';

    //almacenamos en una variable la estructura que nos presta js para un formulario y agregarle info.
    const formData = new FormData();
    //se inserta elnombre de la columba y así donde apunta
    formData.append('upload_preset','React-Journal-App');
    //apuntamos a los file que deseamos
    formData.append('file',file);

    try {
        
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json()
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }

}