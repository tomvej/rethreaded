export const readFileAsString = (file: Blob): Promise<string> => {
    const fileReader = new FileReader();
    const promise = new Promise<string>((resolve, reject) => {
        fileReader.onload = (event) => resolve(event.target?.result as string);
        fileReader.onerror = () => {
            fileReader.abort();
            reject();
        }
    });
    fileReader.readAsText(file);
    return promise;
};
