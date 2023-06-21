const url = 'https://indeed12.p.rapidapi.com/job/b762b8d1132bd276';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '503e238045msh79c635d42528d64p1cc86fjsnfec0c6ead3d0',
        'X-RapidAPI-Host': 'indeed12.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);

    // Display the result on the web page
    const resultElement = document.getElementById('api-result');
    const cardHTML = `
    <div class="card mb-3" style="max-width: 640px;">
    <div class="row g-0">
        <div class="col-md-2">
            <img src="${result.logo_url}"
                class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-10">
            <div class="card-body">
                <h5 class="card-title">${result.name}</h5>
                <p class="card-text">${result.job_title}</p>
                <p class="card-text">${result.job_location}</p>
                <p class="card-text"><small class="text-body-secondary"><a href="${result.indeed_final_url}">Know More</a></small></p>
            </div>
        </div>
    </div>
</div>
    `;
    resultElement.innerHTML = cardHTML;
} catch (error) {
    console.error(error);
}
