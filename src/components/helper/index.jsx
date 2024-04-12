export function prepareBodyData(data = []) {
    let modifiedRow = [];
    if (data?.length > 0) {
        data.forEach(record => {
            modifiedRow.push({
                ...record,
                name: record?.firstName + ' ' + record?.lastName,
                ...(record?.date ? record.Date : createDateKey(record))
            })
        })
    }
    return modifiedRow;
}

export const createDateKey = (record) => {
    return { date: extractCurrentDate() }
}

export function extractCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear();

    return `${year}-${month}-${day}`;
}