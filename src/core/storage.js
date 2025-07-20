const RESULTS_KEY = 'quizResults';

const storage = {
  saveResult(data) {
    try {
      const results = this.getResults();
      results.push(data);
      localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  },

  getResults() {
    try {
      const data = localStorage.getItem(RESULTS_KEY);
    
      if (!data || data.trim() === '') return [];
      return JSON.parse(data);
    } catch (error) {
      console.error('Ошибка чтения:', error);
      return []; 
    }
  }
};

export default storage;
export { RESULTS_KEY };