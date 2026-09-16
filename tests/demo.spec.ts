import {test, expect} from '@playwright/test';


test('Demo Blaze Site API Testing', async({request}) => {

    const startTime = Date.now();
    const response = await request.get("https://api.demoblaze.com/entries", { ignoreHTTPSErrors: true});
    const responseTime = Date.now() - startTime;

    expect(response.ok).toBeTruthy();

    /* const responseBody = await response.json();
    const item = responseBody.Items[2];
    console.log(item.id)
    expect(item.price).toBe(650);
    console.log(item.price) */

    //Using Destructuring 
    const {
        Items: [{id, title, price}]
    } = await response.json();

    const { Items } = await response.json();
    for(const { id,title,price } of Items){
        //console.log();
        console.log(id)
        console.log(title)
        console.log(price)
    }
  //  console.log(id," | ",title," | ", price)
});

test('Check with Map', async({request})=>{
    const response = await request.get('https://api.demoblaze.com/entries');

    const resBody = await response.json()

    const { Items } = resBody;
    /* const titles = resBody.Items.map(item => item.title);
    console.log(titles) */
    Items.forEach(item => {
        expect(item.price).toBeLessThanOrEqual(820)
    });
});

test('Just Check Dummyjson', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts',{ ignoreHTTPSErrors: true});
    //Simple HTTP status code assertion
    await expect(response.status()).toBe(200);

    const resBody = await response.json();
    
    const firstitme = resBody[0];
    console.log(firstitme)
    
    const {titles,ids,userIds,bodys} = resBody;

    /* for(const {title,id,userId,body} of resBody){
        console.log(title)
        console.log(id)
        console.log(userId)
        console.log(body)
    } */
  
});

test('Extract Field Direclty', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/todos');

    const todos = await response.json();
    const [{userId,id,title}] = await response.json();

    todos.forEach(({ title }) => {
        expect(title).toBeTruthy();
    });
})

test('Post Check | jsonplaceholde adding todos', async({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/todos',{
        data: {
            userId:1,
            title: 'Learn Playwright API Testing',
            commpleted: false
        }
    });
    expect(response.status()).toBe(201);

    const body = await response.json()

    console.log(body);

    expect(body.title).toBe('Learn Playwright API Testing');
});

test('PUT Check ', async({request})=>{
    const response = await request.put('https://jsonplaceholder.typicode.com/todos/1',{
        data: {
            userId:1,
            id:1,
            title:'Updated title for Playwright API Learning',
            completed:true
        }
    });
    expect(response.status()).toBe(200);

    const body = await response.json()

    expect(body.title).toBe('Updated title for Playwright API Learning');
    expect(body.completed).toBeTruthy();
    console.log(body.title)
    expect(body).toHaveProperty('completed')
    expect(typeof body.completed).toBe('boolean')
    console.log(response.headers())
    expect(body.title).not.toBeNull();
    //Give selenium and check - The assertion should fail 
    expect(body.title).toContain('Playwright')
});

test('Delete Check ', async({request}) =>{
    const response = await request.delete('https://jsonplaceholder.typicode.com/todos/1')

    expect(response.status()).toBe(200);

    const body = await response.json()

    console.log(body);

});
