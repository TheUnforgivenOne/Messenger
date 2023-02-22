enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RequestParams = {
  endpoint: string;
  query?: { [key: string]: any };
  body?: { [key: string]: any };
};
type RequestParamsWithMethod = RequestParams & { method: Method };

type AddQueryParams = {
  endpoint: string;
  query?: { [key: string]: any };
};

class RequestsBuilder {
  private addQuery({ endpoint, query }: AddQueryParams): string {
    let url = endpoint;
    if (query && Object.keys(query).length) {
      url += `?${new URLSearchParams(query).toString()}`;
    }

    return url;
  }

  private async request({
    endpoint,
    method,
    query,
    body,
  }: RequestParamsWithMethod) {
    const url = this.addQuery({ endpoint, query });

    return await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    }).then((response) => response.json());
  }

  public async get(params: RequestParams) {
    return await this.request({ ...params, method: Method.GET });
  }

  public async post(params: RequestParams) {
    return await this.request({ ...params, method: Method.POST });
  }

  public async put(params: RequestParams) {
    return await this.request({ ...params, method: Method.PUT });
  }

  public async delete(params: RequestParams) {
    return await this.request({ ...params, method: Method.DELETE });
  }
}

export default new RequestsBuilder();
