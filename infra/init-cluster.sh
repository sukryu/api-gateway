#!/bin/bash
# init-cluster.sh

# Wait for Redis nodes to be ready
echo "Waiting for Redis nodes to start..."
sleep 10

# Initialize Redis cluster
docker exec redis-node-0 redis-cli --cluster create \
 redis-node-0:7000 \
 redis-node-1:7001 \
 redis-node-2:7002 \
 redis-node-3:7003 \
 redis-node-4:7004 \
 redis-node-5:7005 \
 --cluster-replicas 1 --cluster-yes

# Initialize Patroni cluster
echo "Waiting for etcd..."
sleep 5

# Check etcd is running
until curl -s http://localhost:2379/health; do
 echo "Waiting for etcd to be ready..."
 sleep 2
done

echo "Waiting for Patroni nodes..."
sleep 10

# Initialize first node as primary
docker exec patroni-1 patronictl -c /etc/patroni/patroni.yml init postgres-cluster

# Join other nodes to cluster
for node in patroni-2 patroni-3; do
 docker exec $node patronictl -c /etc/patroni/patroni.yml join postgres-cluster
done

echo "Clusters initialized successfully"

# Setup monitoring
echo "Setting up Prometheus and Grafana..."

# Wait for Prometheus
until curl -s http://localhost:9090/-/ready; do
 echo "Waiting for Prometheus..."
 sleep 2
done

# Wait for Grafana
until curl -s http://localhost:3000/api/health; do
 echo "Waiting for Grafana..."
 sleep 2
done

# Import Grafana dashboards
for dashboard in ./grafana/dashboards/*.json; do
 curl -X POST -H "Content-Type: application/json" \
   -d @$dashboard \
   http://admin:admin@localhost:3000/api/dashboards/db
done

echo "Setup complete!"