const { Language } = require('../helpers');
const axios = require('axios');

module.exports = async options => {
  const languages = {};

  let { data } = await axios.get('https://github-trending-api.now.sh');

  // Ensure that just 100 trending repository will be treated.
  data = data.slice(0, 100);

  // Calculate data for every language
  data.forEach(repo => {
    if (repo.language) {
      let currentLanguage = null;

      if (languages[repo.language] === undefined) {
        languages[repo.language] = new Language(repo.language);
      }

      currentLanguage = languages[repo.language];

      currentLanguage.addRepository(repo);
    }
  });

  // Prepare data for response
  const result = [];

  for (const key in languages) {
    const lang = languages[key].toJSON();

    result.push(lang);
  }

  result.sort((a, b) => {
    return Language.compare(a, b, options);
  });

  return result;
};
