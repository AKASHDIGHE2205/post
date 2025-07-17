import { useState, useEffect } from "react";

const withDataPosting = (fetchData: () => Promise<any>,dataKeys:any[]) => (WrappedComponent: React.ComponentType<any>) => {
    const WithDataPosting = () => {
        const [data, setData] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [searchTerm, setSearchTerm] = useState("");
        const [loading, setLoading] = useState(true);
        const itemsPerPage = 8;
  
        useEffect(() => {
            const fetchDataAsync = async () => {
                try {
                    const response = await fetchData();
                    setData(response);
                    setLoading(false);
                } catch (error: any) {
                    console.error(`Something went wrong, ${error}`);
                }
            };
            fetchDataAsync();
        }, [fetchData]);

        const handlePageChange = (pageNumber: number) => {
            setCurrentPage(pageNumber);
        };

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
         // Filter data based on searchTerm and dataKeys
         const filteredData = data.filter((item: any) =>
            dataKeys.some((key:any) =>item[key] && item[key].toString().toLowerCase().includes(searchTerm.toLowerCase()) 
                
            )
        );
       
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        return (
            <WrappedComponent
                data={data}
                fitem={currentItems}
                currentPage={currentPage}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handlePageChange={handlePageChange}
                itemperPage={itemsPerPage}
                loading={loading}

            />
        );
    };

    return WithDataPosting;
};

export default withDataPosting;