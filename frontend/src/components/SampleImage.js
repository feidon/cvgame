const SampleImage = {
    create: () => {
        let imageEl = new Image(1024, 701);
        imageEl.src = "../img/sample.png";
        return new Promise(resolve => {
            imageEl.onload = function () {
                resolve(imageEl);
            }
        });
    },
};

export default SampleImage;