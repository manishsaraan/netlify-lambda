const create = data => {
  return fetch("http://localhost:9000/.netlify/functions/todos-create", {
    body: JSON.stringify(data),
    method: "POST"
  }).then(response => {
    return response.json();
  });
};

const readAll = () => {
  return fetch("/.netlify/functions/todos-read-all").then(response => {
    console.log(response);
    return response.json();
  });
};

export default {
  create,
  readAll
};
