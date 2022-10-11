const request = async (url, method = 'GET', body) => {
	const options = {
		method,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	if (method === 'POST') options.body = JSON.stringify(body);
	const response = await fetch(`http://localhost:5001${url}`, options);
	return await response.json();
};

const appendLi = emp => {
	const $emps = document.getElementById('emps');
	const $li = document.createElement('li');
	$li.setAttribute('id', `emp-${emp.id}`);
	$li.innerHTML = `
    ${emp.id}. ${emp.name}
    <button onclick='delEmp(${emp.id})'>DEL</button>
  `;
	$emps.appendChild($li);
};

const addEmp = async () => {
	const name = document.getElementById('name').value;
	const res = await request('/emps', 'POST', { name });
	console.log('post.res>>', res);

	appendLi(res);
};

const delEmp = async empId => {
	const res = await request(`/emps/${empId}`, 'DELETE');
	console.log('del.res>>', res);
	document.getElementById(`emp-${empId}`).remove();
};

const setEmps = async () => {
	const emps = await request('/emps');
	console.log('emps>>>', emps);
	const $emps = document.getElementById('emps');
	// console.log('$emps>>', $emps);
	emps.forEach(emp => {
		appendLi(emp);
	});
};

setEmps();
