function applyMap() {
    // Hide all maps
    document.querySelectorAll('.mapstyle').forEach(map => map.style.display = 'none');

    // Get the selected map
    var selectedMap = document.querySelector('input[name="layer"]:checked').value;
    console.log(selectedMap)


    const dropdownST = document.getElementById('filterST');
    dropdownST.innerHTML = '';

    const dropdownPT = document.getElementById('filterPT');
    dropdownPT.innerHTML = '';

    const dropdownRS = document.getElementById('filterRS');
    dropdownRS.innerHTML = '';


    if (selectedMap === 'map_AC') {


        const statesAC = ["None", "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH", "DELHI", "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JAMMU & KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "ORISSA", "PUDUCHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TRIPURA", "UTTAR PRADESH", "UTTARAKHAND", "WEST BENGAL"];

        // Populate the dropdown menu with options
        const statesACDropdown = document.getElementById('filterST');
        statesAC.forEach(acstate => {
            const option = document.createElement('option');
            option.value = acstate;
            option.text = acstate;
            statesACDropdown.appendChild(option);
        });



        const partyAC = ["None", "HPC", "MZPC", "NULL", "SAD", "PMC", "INPT", "IND", "HPDP", "KEC(B)", "UDP", "KEC(J)", "MDF", "JP", "LJNSP", "ZNP", "JD(U)", "RLD", "MDP", "BSP", "NDM", "RPD", "MADMK", "CMPKSC", "DMK", "ADMK", "TDP", "SJP(R)", "OGP", "PMK", "KEC(M)", "AIMIM", "NLP", "Awaited", "BJP", "NPF", "TRS", "RSMD", "JD(S)", "CPI", "AITC", "TMC(M)", "KEC", "MUL", "LMHP", "NCP", "ABLTC", "RPI", "DRPP", "INC", "RSNM", "INLD", "KHNAM", "KNDP", "SAP", "HVC", "MAG", "WBSP", "JPSS", "ASDC(U)", "SP", "MNC", "JMM", "MPP", "AD", "FBL", "MNF", "ABHM", "RTKP", "CPM", "MSCP", "FPM", "UGDP", "RSPK(B)", "SDF", "RSP", "BJD", "GNLF", "AGP", "KCVP", "UKKD", "GGP"];

        // Populate the dropdown menu with options
        const partyACDropdown = document.getElementById('filterPT');
        partyAC.forEach(acparty => {
            const option = document.createElement('option');
            option.value = acparty;
            option.text = acparty;
            partyACDropdown.appendChild(option);
        });



        const reserveAC = ["None", "GEN", "SC", "ST", "#N/A", 0]

        // Populate the dropdown menu with options
        const reserveACDropdown = document.getElementById('filterRS');
        reserveAC.forEach(ACreserve => {
            const option = document.createElement('option');
            option.value = ACreserve;
            option.text = ACreserve;
            reserveACDropdown.appendChild(option);
        });



        popupAC(map_AC, geoserverLayerSourceAC);
        // applyFilterST_AC(geoserverLayerSourceAC)
    }
    else if (selectedMap === 'map_PC') {


        const statesPC = ["None", "ANDAMAN & NICOBAR", "ANDHRA PRADESH", "ARUNACHAL PRADESH", "ASSAM", "BIHAR", "CHHATTISGARH", "DADRA & NAGAR HAVELI", "DAMAN & DIU", "DELHI", "GOA", "GUJARAT", "HARYANA", "HIMACHAL PRADESH", "JAMMU & KASHMIR", "JHARKHAND", "KARNATAKA", "KERALA", "LAKSHADWEEP", "MADHYA PRADESH", "MAHARASHTRA", "MANIPUR", "MEGHALAYA", "MIZORAM", "NAGALAND", "ORISSA", "PUDUCHERRY", "PUNJAB", "RAJASTHAN", "SIKKIM", "TAMIL NADU", "TELANGANA", "TRIPURA", "UTTAR PRADESH", "UTTARKHAND", "WEST BENGAL"];

        // Populate the dropdown menu with options
        const statesPCDropdown = document.getElementById('filterST');
        statesPC.forEach(pcstate => {
            const option = document.createElement('option');
            option.value = pcstate;
            option.text = pcstate;
            statesPCDropdown.appendChild(option);
        });



        const partyPC = ["None", "BJP", "INC", "SAD", "AAP", "RLP", "BSP", "SP", "LJP", "JD(U)", "ADS", "SKM", "NDPP", "NPP", "MNF", "AIUDF", "IND", "AITC", "BJD", "SHS", "NCP", "TRS", "AIMIM", "YSRCP", "TDP", "JD(S)", "IUML", "KEC(M)", "CPM", "RSP", "CPI", "DMK", "VCK", "ADMK", "JKN", "JMM", "AJSU Party", "0"];

        // Populate the dropdown menu with options
        const partyPCDropdown = document.getElementById('filterPT');
        partyPC.forEach(pcparty => {
            const option = document.createElement('option');
            option.value = pcparty;
            option.text = pcparty;
            partyPCDropdown.appendChild(option);
        });



        const reservePC = ["None", "GEN", "SC", "ST", 0]

        // Populate the dropdown menu with options
        const reservePCDropdown = document.getElementById('filterRS');
        reservePC.forEach(PCreserve => {
            const option = document.createElement('option');
            option.value = PCreserve;
            option.text = PCreserve;
            reservePCDropdown.appendChild(option);
        });


        popupPC(map_PC, geoserverLayerSourcePC);
        // applyFilterST_AC(geoserverLayerSourcePC)
    }
    document.getElementById(selectedMap).style.display = 'block';
}




function applyFilterST() {
    var selectedMapST = document.querySelector('input[name="layer"]:checked').value;
    if (selectedMapST === 'map_AC') {
        applyFilterST_AC(geoserverLayerSourceAC)
    } else if (selectedMapST === 'map_PC') {
        applyFilterST_PC(geoserverLayerSourcePC)
    }
}


function applyFilterPT() {
    var selectedMapPT = document.querySelector('input[name="layer"]:checked').value;
    if (selectedMapPT === 'map_AC') {
        applyFilterPT_AC(geoserverLayerSourceAC)
    } else if (selectedMapPT === 'map_PC') {
        applyFilterPT_PC(geoserverLayerSourcePC)
    }
}



function applyFilterRS() {
    var selectedMapPT = document.querySelector('input[name="layer"]:checked').value;
    if (selectedMapPT === 'map_AC') {
        applyFilterRS_AC(geoserverLayerSourceAC)
    } else if (selectedMapPT === 'map_PC') {
        applyFilterRS_PC(geoserverLayerSourcePC)
    }
}

// Clear all filters and reset to default state
function clearFilters() {
    document.getElementById('filterST').value = '';
    document.getElementById('filterPT').value = '';
    document.getElementById('filterRS').value = '';

    geoserverLayerSourcePC.updateParams({ 'CQL_FILTER': null });
    geoserverLayerSourceAC.updateParams({ 'CQL_FILTER': null });
}