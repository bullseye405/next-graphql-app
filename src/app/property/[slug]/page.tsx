import { getClient } from "@/lib/ApolloClient";
import { gql } from "@apollo/client";
import React from "react";

interface PropertyPage {
  params: { slug: string };
}

const page = async ({ params }: PropertyPage) => {
  const GetPostBySlugQuery = gql`
    query GetPropertyBySlug($slug: Int!) {
      property(where: { id: { _eq: $slug } }) {
        id
        address
        tenants {
          id
          full_name
          phone
        }
      }
    }
  `;
  const {
    data: { property },
  } = await getClient().query({
    query: GetPostBySlugQuery,
    variables: { slug: Number(params.slug) },
  });

  console.log({ property });
  return (
    <div className="p-3">
      <div className="flex gap-3">
        {property.map((item: any) => (
          <div key={item.id} className="card rounded">
            <div>{item.address}</div>
            <div className="flex gap-3">
              {item.tenants.map((tenant: any) => (
                <div key={tenant.id} className="card rounded">
                  <div>{tenant.full_name}</div>
                  <div>{tenant.phone}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
