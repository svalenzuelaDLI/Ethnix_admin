export const states = [
    { value: 'AK', label: 'Alaska'},
    { value: 'TX', label: 'Texas'},
    { value: 'AL', label: 'Alabama'},
    { value: 'AR', label: 'Arkansas'},
    { value: 'AZ', label: 'Arizona'},
    { value: 'CA', label: 'California'},
    { value: 'CO', label: 'Colorado'},
    { value: 'CT', label: 'Connecticut'},
    { value: 'DC', label: 'DistrictofColumbia'},
    { value: 'DE', label: 'Delaware'},
    { value: 'FL', label: 'Florida'},
    { value: 'GA', label: 'Georgia'},
    { value: 'HI', label: 'Hawaii'},
    { value: 'IA', label: 'Iowa'},
    { value: 'ID', label: 'Idaho'},
    { value: 'IL', label: 'Illinois'},
    { value: 'IN', label: 'Indiana'},
    { value: 'KS', label: 'Kansas'},
    { value: 'KY', label: 'Kentucky'},
    { value: 'LA', label: 'Louisiana'},
    { value: 'MA', label: 'Massachusetts'},
    { value: 'MD', label: 'Maryland'},
    { value: 'ME', label: 'Maine'},
    { value: 'MI', label: 'Michigan'},
    { value: 'MN', label: 'Minnesota'},
    { value: 'MO', label: 'Missouri'},
    { value: 'MS', label: 'Mississippi'},
    { value: 'MT', label: 'Montana'},
    { value: 'NC', label: 'NorthCarolina'},
    { value: 'ND', label: 'NorthDakota'},
    { value: 'NE', label: 'Nebraska'},
    { value: 'NH', label: 'NewHampshire'},
    { value: 'NJ', label: 'NewJersey'},
    { value: 'NM', label: 'NewMexico'},
    { value: 'NV', label: 'Nevada'},
    { value: 'NY', label: 'NewYork'},
    { value: 'OH', label: 'Ohio'},
    { value: 'OK', label: 'Oklahoma'},
    { value: 'OR', label: 'Oregon'},
    { value: 'PA', label: 'Pennsylvania'},
    { value: 'RI', label: 'RhodeIsland'},
    { value: 'SC', label: 'SouthCarolina'},
    { value: 'SD', label: 'SouthDakota'},
    { value: 'TN', label: 'Tennessee'},
    { value: 'TX', label: 'Texas'},
    { value: 'UT', label: 'Utah'},
    { value: 'VA', label: 'Virginia'},
    { value: 'VT', label: 'Vermont'},
    { value: 'WA', label: 'Washington'},
    { value: 'WI', label: 'Wisconsin'},
    { value: 'WV', label: 'WestVirginia'},
    { value: 'WY', label: 'Wyoming'}
    ];

    export const weekdays = [
        { value: 'SUNDAY', label: 'Sunday'},
        { value: 'MONDAY', label: 'Monday'},
        { value: 'TUESDAY', label: 'Tuesday'},
        { value: 'WEDNESDAY', label: 'Wednesday'},
        { value: 'THURSDAY', label: 'Thursday'},
        { value: 'FRIDAY', label: 'Friday'},
        { value: 'SATURDAY', label: 'Saturday'},
    ];

    export const statusCustomer = [
        { value: 9, label: 'In revision (finance)'},
        { value: 1, label: 'In revision (customer service)'},
        { value: 2, label: 'Refused'},
        { value: 3, label: 'Commercial'},
        { value: 4, label: 'Operations'},
        { value: 5, label: 'Finance'},
        { value: 6, label: 'Completed'},
        { value: 7, label: 'In SAP'},
        { value: 8, label: 'In SAP But Pepperi Error'},

    ];

    export const statusProducts = [
        { value: 1, label: 'In Purchasing'},
        { value: 2, label: 'In Marketing'},
        { value: 3, label: 'In Finances'},
        { value: 4, label: 'Refused'},
        //{ value: 5, label: 'Completed'},
        { value: 6, label: 'Completed - In SAP'},
    ];

    /**
     *     case 1:
           return (
             <div className="flex items-center">
               <Badge color="warning" renderAsDot />
               <Text className="ms-2 font-medium text-primary-dark">In Purchasing</Text>
             </div>
           );
         case 2:
           return (
             <div className="flex items-center">
               <Badge color="primary" renderAsDot />
               <Text className="ms-2 font-medium text-primary-dark">In Marketing</Text>
             </div>
           );
           case 3:
             return (
               <div className="flex items-center">
                 <Badge color="primary" renderAsDot />
                 <Text className="ms-2 font-medium text-primary-dark">In Finances</Text>
               </div>
             );
             case 4:
               return (
                 <div className="flex items-center">
                   <Badge color="danger" renderAsDot />
                   <Text className="ms-2 font-medium text-primary-dark">Refused</Text>
                 </div>
               );
             case 5:
               return (
                 <div className="flex items-center">
                   <Badge color="primary" renderAsDot />
                   <Text className="ms-2 font-medium text-primary-dark">Completed</Text>
                 </div>
               );
                 case 6:
                   return (
                     <div className="flex items-center">
                       <Badge color="success" renderAsDot />
                       <Text className="ms-2 font-medium text-primary-dark">Completed - In SAP</Text>
                     </div>
                   );
     * 
     */

 
    export const statusProduct = [
        { value: 1, label: 'In Purchasing '},
        { value: 2, label: 'In Marketing'},
        { value: 3, label: 'In Finances'},
        { value: 4, label: 'Refused'},
        { value: 5, label: 'Completed'},
        { value: 6, label: 'In SAP'},

    ];

    export const statusProductPurchasing = [
        { value: 1, label: 'In Purchasing '},
        { value: 4, label: 'Refused'},
    ];
    export const statusProductMarketing = [
        { value: 1, label: 'In Purchasing '},
        { value: 4, label: 'Refused'},
    ];
    export const statusProductFinances = [
        { value: 1, label: 'In Purchasing '},
        { value: 2, label: 'In Marketing'},
        { value: 4, label: 'Refused'},
    ];

    export const statusProductString = [
        { value: "1", label: 'In Purchasing '},
        { value: "2", label: 'In Marketing'},
        { value: "3", label: 'In Finances'},
        { value: "4", label: 'Refused'},
        { value: "5", label: 'Completed'},
        { value: "6", label: 'In SAP'},

    ];

    export const statusCustomerString = [
        { value: "9", label: 'In revision (finance)'},
        { value: "1", label: 'In revision (customer service)'},
        { value: "2", label: 'Refused'},
        { value: "3", label: 'Commercial'},
        { value: "4", label: 'Operations'},
        { value: "5", label: 'Finance'},
        { value: "6", label: 'Completed'},
        { value: "8", label: 'In Sap But Pepperi Error'},
    ];

    export const weekdaysnumbers = [
        { value: '1', label: 'Sunday'},
        { value: '2', label: 'Monday'},
        { value: '3', label: 'Tuesday'},
        { value: '4', label: 'Wednesday'},
        { value: '5', label: 'Thursday'},
        { value: '6', label: 'Friday'},
        { value: '7', label: 'Saturday'},
    ];

    export const visitfrecuency = [
        { value: '1', label: 'Once by Period'},
        { value: '2', label: 'Bi-Weekly'},
        { value: '4', label: 'Weekly'},
     
    ];

    export const deliveryzones = [
        { value: 'PUERTA PRINCIPAL (PARTE DELANTERA)', label: 'Puerta principal (parte delantera)'},
        { value: 'PUERTA DE DESCARGA (PARTE TRASERA)', label: 'Puerta de descarga (parte trasera)'},    
    ];

    export const yesnoanswer = [
        { value: true, label: 'Si'},
        { value: false, label: 'No'},
    ];

    export const ReturnReasons = [
        { value: '105', label: 'DAMAGE PRODUCT'},
        { value: '111', label: 'EXPIRED'},
    ];

    export const CommisionList = [
        { value: 'AAA', label: 'AAA'},
        { value: 'AA', label: 'AA'},
        { value: 'A', label: 'A'},
        { value: 'B', label: 'B'},
    ];
    export const properties_extra = [
        {
            "code": "2",
            "name": "SEPARATED INVOICES"
        },
        // {
        //     "code": "26",
        //     "name": "ENABLE CHANGE PRICE"
        // },
        
    ];

    export const properties_services = [
        {
            "code": "37",
            "name": "GROCERY - DRY PRODUCT"
        },
        {
            "code": "38",
            "name": "DAIRY SECTION"
        },
        {
            "code": "39",
            "name": "FROZEN SECTION"
        },
        {
            "code": "40",
            "name": "PRODUCE"
        },
        {
            "code": "41",
            "name": "MEAT DEPARTAMENT"
        },
        {
            "code": "42",
            "name": "RESTAURANT"
        },
        {
            "code": "43",
            "name": "MONEY SERVICES"
        },
        {
            "code": "44",
            "name": "OTC (MEDICINAS)"
        },
        {
            "code": "45",
            "name": "KITCHENWARE (UTENSILIOS DE COCINA)"
        },
        {
            "code": "46",
            "name": "ETHNIC SOURVENIRS"
        },
        {
            "code": "47",
            "name": "CLOTHING"
        },
        {
            "code": "48",
            "name": "JEWELRY"
        },
        {
            "code": "49",
            "name": "CELLPHONE STORE"
        }
    ];

    export const properties_ethnias = [
        {
            "code": "55",
            "name": "EL SALVADOR"
        },
        {
            "code": "56",
            "name": "GUATEMALA"
        },
        {
            "code": "57",
            "name": "COSTA RICA"
        },
        {
            "code": "58",
            "name": "MEXICO"
        },
        {
            "code": "59",
            "name": "COLOMBIA"
        },
        {
            "code": "60",
            "name": "PERU"
        },
        {
            "code": "61",
            "name": "VENEZUELA"
        },
        {
            "code": "62",
            "name": "CUBA"
        },
        {
            "code": "63",
            "name": "PUERTO RICO"
        },
        {
            "code": "64",
            "name": "HONDURAS"
        }
    ]


    export const properties_ethniasITEMS = [
        {
            "code": "22",
            "name": "EL SALVADOR"
        },
        {
            "code": "21",
            "name": "GUATEMALA"
        },
        {
            "code": "24",
            "name": "NICARAGUA"
        },
        {
            "code": "25",
            "name": "COSTA RICA"
        },
        {
            "code": "20",
            "name": "MEXICO"
        },
        {
            "code": "28",
            "name": "COLOMBIA"
        },
        {
            "code": "30",
            "name": "SURAMERICA"
        },
        {
            "code": "27",
            "name": "CENTROAMERICANO"
        },
        {
            "code": "32",
            "name": "LATINOAMERICA"
        },
        {
            "code": "26",
            "name": "CARIBE"
        },
        {
            "code": "29",
            "name": "VENEZUELA"
        },
      
        {
            "code": "23",
            "name": "HONDURAS"
        }
    ]