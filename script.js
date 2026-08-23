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