export function prepareBodyData(data = []) {
    let modifiedRow = [];
    if (data?.length > 0) {
        data.forEach(record => {
            modifiedRow.push({
                ...record,
                name: record?.firstName + ' ' + record?.lastName
            })
        })
    }
    return modifiedRow;
}