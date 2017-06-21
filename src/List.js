import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class List extends Component {
  render() {
    const { className, data } = this.props
    return <div className={className}>
      {
        data.loading
          ? <strong>loading...</strong>
          : <div>
            list: {
              data.list == null
                ? <span>null</span>
                : <ul>
                  {data.list.map((el, idx) => <li key={idx}>{el}</li>)}
                </ul>
            }
          </div>
      }
    </div>
  }
}

export default graphql(gql`
query List($type: String!) {
  list(type: $type)
}
`, {
  options: (props) => ({
    variables: { type: props.type },
    pollInterval: 4000,
  })
})(List);