const SampleImage = {
    create: () => {
        let imageEl = new Image(640, 480);
        imageEl.src = "https://images.unsplash.com/photo-1634096384757-c034cf28be3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80";
        return new Promise(resolve => {
            imageEl.onload = function () {
                resolve(imageEl);
            }
        });
    },
};

export default SampleImage;