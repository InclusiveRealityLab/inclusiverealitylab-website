// Utility to extract safe data from response
const extractData = (data) => {
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : parsed.result || [];
      } catch (e) {
        return [];
      }
    }
    return data.result || [];
  };

  export default extractData;