const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('meal-search');
const mealGrid = document.getElementById('meal-grid');
const status = document.getElementById('status');
const resultCount = document.getElementById('result-count');
const showAllWrap = document.getElementById('show-all-wrap');
const showAllButton = document.getElementById('show-all');
let allMeals = [];

function escapeHtml(value) {
	const element = document.createElement('div');
	element.textContent = value || '';
	return element.innerHTML;
}

function renderMeals(meals) {
	mealGrid.innerHTML = meals.map((meal, index) => `
		<article class="meal-card" style="animation-delay: ${index * 45}ms">
			<img class="meal-image" src="${escapeHtml(meal.strMealThumb)}" alt="${escapeHtml(meal.strMeal)}">
			<div class="meal-content">
				<span class="meal-id">Meal ID: ${escapeHtml(meal.idMeal)}</span>
				<h3>${escapeHtml(meal.strMeal)}</h3>
				<p class="instruction">${escapeHtml(meal.strInstructions || 'No cooking instructions available for this recipe.')}</p>
			</div>
		</article>
	`).join('');
}

function displayResults() {
	const visibleMeals = allMeals.length > 5 ? allMeals.slice(0, 5) : allMeals;
	renderMeals(visibleMeals);
	status.classList.add('hidden');
	resultCount.textContent = `${allMeals.length} meal${allMeals.length === 1 ? '' : 's'} found`;
	showAllWrap.classList.toggle('hidden', allMeals.length <= 5);
}

searchForm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const query = searchInput.value.trim();
	if (!query) return;

	allMeals = [];
	mealGrid.innerHTML = '';
	showAllWrap.classList.add('hidden');
	status.className = 'status';
	status.textContent = 'Searching for something delicious...';
	resultCount.textContent = 'Loading results';
	document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });

    try {
		const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
		if (!response.ok) throw new Error('The recipe service is unavailable.');
		const data = await response.json();
		allMeals = data.meals || [];
		if (!allMeals.length) {
			status.textContent = `No meals found for “${query}”. Try another search.`;
			resultCount.textContent = 'No results';
			return;
		}
		displayResults();
	} catch (error) {
		status.className = 'status error';
		status.textContent = error.message || 'Something went wrong. Please try again.';
		resultCount.textContent = 'Search unavailable';
	}
});

showAllButton.addEventListener('click', () => {
	renderMeals(allMeals);
	showAllWrap.classList.add('hidden');
});
