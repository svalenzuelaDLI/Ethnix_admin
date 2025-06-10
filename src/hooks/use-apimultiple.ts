export async function fetchAllPages(baseUrl, pageSize = 10) {
  let allData = [];
  let page = 1;
  let hasNextPage = true;


  while (hasNextPage) {
    const url = `${baseUrl}?page=${page}&limit=${pageSize}`; // Adjust as needed


    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();


      if (data && data.length > 0) {
        allData = allData.concat(data);
        page++;
      } else {
        hasNextPage = false;
      }
    } catch (error) {
      console.error("Error fetching page:", error);
      hasNextPage = false; // Stop on error
    }
  }
  return allData;
}
