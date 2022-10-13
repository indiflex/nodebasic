const BODY_METHODS = ['POST', 'PUT', 'PATCH'];

const request = async (url, method = 'GET', body) => {
	const options = {
		method,
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	};

	if (BODY_METHODS.includes(method)) options.body = JSON.stringify(body);
	try {
		const response = await fetch(`http://localhost:5001${url}`, options);
		return await response.json();
	} catch (error) {
		throw error;
	}
};

const empComp = emp => {
	const $empLi = document.createElement('li');
	$empLi.setAttribute('id', `emp-${emp.id}`);
	$empLi.innerHTML = `
    ${emp.id}. ${emp.name}
    <button onclick='editingEmp(${JSON.stringify(emp)})'>Edit</button>
    <button onclick='delEmp(${emp.id})'>DEL</button>
  `;
	return $empLi;
};

const appendLi = emp => {
	const $emps = document.getElementById('emps');
	$emps.appendChild(empComp(emp));
};

const cancelEmp = emp => {
	const $empLi = document.getElementById(`emp-${emp.id}`);
	$empLi.replaceWith(empComp(emp));
};

const editEmp = async empId => {
	const name = document.getElementById(`emp-${empId}-name`).value;
	if (!name) return alert('Input the name, please.');
	try {
		const res = await request('/emps/' + empId, 'PUT', { name });
		console.log('put.res>>', res);
		cancelEmp(res);
	} catch (error) {
		alert(error);
	}
};

const editingEmp = emp => {
	const $empLi = document.getElementById(`emp-${emp.id}`);
	console.log('$empLi>>', $empLi);
	$empLi.innerHTML = `
    <input type="text" id="emp-${emp.id}-name" value="${emp.name}" />
    <button onclick='cancelEmp(${JSON.stringify(emp)})'>Cancel</button>
    <button onclick='editEmp(${emp.id})'>Save</button>
  `;
};

const addEmp = async () => {
	const name = document.getElementById('name').value;
	if (!name) return alert('Input the name, please.');
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
