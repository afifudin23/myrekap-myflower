export const isoDateToStringDateTime = (isoDate: any) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const formatCapital = (data: string = "") => {
    if (data === "POLISI_MILITER") {
    return data
        .toLowerCase() // change to lowercase
        .replace(/_/g, " ") // change underscore to space
        .replace(/\b\w/g, (char) => char.toUpperCase()); // cpitalize each word
    }
    return data
        .toLowerCase() // change to lowercase
        .replace(/_/g, " ") // change underscore to space
        .replace(/\b\w/g, (char) => char.toUpperCase()); // cpitalize each word
};
