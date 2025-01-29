import { Form, Link, useLoaderData } from "react-router-dom";

export function Contacts() {

    const {contacts} = useLoaderData()
    console.log(contacts);
    
    return (
        <>
            <h1>Contacts:</h1>
            <Form method="post">
                <input type="submit" value="Add" />
            </Form>
            <ul>
                {contacts.map((contact: any) => (
                    <li key={contact.id}>
                        <Link to={`${contact.id}`}>
                        {contact.first} {contact.last}
                        <img src={contact.avatar} className="avatar" alt="" />
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}