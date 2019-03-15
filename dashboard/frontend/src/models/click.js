const baseUrl = 'http://' + window.location.hostname + ':3000/click',
      countUrl = baseUrl + '/count',
      aggregateUrl = baseUrl + '/aggregate',
      heatmapUrl = baseUrl + '/heatmap';

const Click = {
    aggregate: function() {
        return fetch(aggregateUrl).then(response => {
            return response.json()
        });
    },
    count: function() {
        return fetch(countUrl).then(response => {
            return response.json()
        });
    },
    heatmap: function() {
        return fetch(heatmapUrl).then(response => {
           return response.json();
        });
    }
};

export default Click;