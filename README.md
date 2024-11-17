<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Your Project Name

## Architecture

### Overall System Architecture
```mermaid
graph LR
    %% 클라이언트와 로드 밸런서
    Client([Client])
    LB[Load Balancer HAProxy\]

    %% API 게이트웨이 (인증 및 권한 관리 통합)
    Gateway[API Gateway Authentication & Authorization]

    %% Kafka 클러스터들
    Kafka1[Kafka Cluster 1]
    Kafka2[Kafka Cluster 2]
    Kafka3[Kafka Cluster 3]

    %% 마이크로서비스들
    FileService[File Service]
    PostsService[Posts Service]
    CommentsService[Comments Service]
    FollowService[Follow Service]
    AlertsService[Alerts Service]
    SearchService[Search Service]
    MediaService[Media Service]
    ChatService[Chatting Service]
    AnalyzeService[Analyze Service]
    SuggestService[Suggestion Service]
    LoggingService[Logging Service]

    %% 데이터베이스 및 모니터링
    PostgreSQL[(PostgreSQL HA Cluster)]
    Redis[(Redis Cluster)]
    MongoDB[(MongoDB)]
    Grafana[Grafana]
    Prometheus[Prometheus]
    Elasticsearch[(Elasticsearch)]
    Storage[(AWS S3 / GCP Storage)]
    DataWarehouse[(Data Warehouse)]
    MLModels[(Machine Learning Models)]

    %% 연결 관계
    Client --> LB
    LB --> Gateway

    %% API 게이트웨이와 Kafka 연결
    Gateway --> Kafka1
    Gateway --> Kafka2
    Gateway --> Kafka3

    %% Kafka와 마이크로서비스 연결
    Kafka1 --> FileService
    Kafka1 --> PostsService
    Kafka1 --> CommentsService

    Kafka2 --> FollowService
    Kafka2 --> AlertsService
    Kafka2 --> SearchService

    Kafka3 --> MediaService
    Kafka3 --> ChatService
    Kafka3 --> AnalyzeService
    Kafka3 --> SuggestService
    Kafka3 --> LoggingService

    %% 마이크로서비스와 데이터베이스 연결
    FileService --> PostgreSQL
    PostsService --> PostgreSQL
    CommentsService --> PostgreSQL
    FollowService --> PostgreSQL
    AlertsService --> PostgreSQL
    SearchService --> Elasticsearch
    MediaService --> Storage
    ChatService --> MongoDB
    AnalyzeService --> DataWarehouse
    SuggestService --> MLModels
    LoggingService --> Elasticsearch

    %% 모니터링
    Gateway --> Prometheus
    Gateway --> Grafana
    Prometheus --> Grafana

    %% Redis 연결
    Gateway --> Redis

    %% 마이크로서비스 그룹화 및 연결
    subgraph Microservices
        FileService
        PostsService
        CommentsService
        FollowService
        AlertsService
        SearchService
        MediaService
        ChatService
        AnalyzeService
        SuggestService
        LoggingService
    end
    Microservices --> Redis
    Microservices --> Prometheus

    %% 인프라스트럭처 그룹화
    subgraph Infrastructure
        LB
        Kafka1
        Kafka2
        Kafka3
        PostgreSQL
        Redis
        MongoDB
        Prometheus
        Grafana
        Elasticsearch
        Storage
        DataWarehouse
        MLModels
    end
```

## Project Structure
```
server/
├── infra/              # Infrastructure configurations
│   ├── haproxy/        # HAProxy configurations
│   ├── monitoring/     # Monitoring setup (Prometheus, Grafana)
│   └── logging/        # Logging setup (ELK Stack)
├── api-gateway/        # API Gateway Service
├── file-service/       # File Management Service
├── etc../
```

## Features

- Load balancing with HAProxy
- Microservice architecture
- Distributed caching
- Authentication and Authorization
- File management
- Monitoring and logging

## Getting Started

[Installation and setup instructions here]

## Development

[Development guidelines and instructions here]

## Deployment

[Deployment instructions here]

## Contributing

[Contribution guidelines here]

## License

[Your chosen license here]

# Kubernetes 클러스터 구성

```bash
# Minikube 설치 (시스템에 따라 설치 방법이 다를 수 있음)
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# kubectl 설치
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Minikube 클러스터 시작
minikube delete
minikube start --cpus=6 --memory=15911 --disk-size=100g --driver=docker
minikube status

#minikube가 정상적으로 설정되었는지 확인
minikube get storageclass
```

# Helm 설치 및 레포 추가
```bash
# Helm 설치
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# Helm 버전 확인
helm version

# Helm 레포 추가
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

# HAProxy
```bash
# HAProxy helm repo 추가
helm repo add haproxy-ingress https://haproxy-ingress.github.io/charts

# HAProxy 설치
helm install haproxy haproxy-ingress/haproxy-ingress -f haproxy/values.yaml
```

# Kubernetes 비밀번호 시크릿 생성
```bash
# PostgreSQL 비밀번호 시크릿 생성
kubectl create secret generic postgresql-password \
  --from-literal=password=jinhyeok123 \
  --from-literal=repmgr-password=jinhyeok123 \
  -n database

# 시크릿 확인
kubectl get secret postgresql-password -n database -o yaml

# 네임스페이스 생성
kubectl apply -f infra/k8s/namespaces/database-namespace.yaml
kubectl apply -f infra/k8s/namespaces/monitoring-namespace.yaml
kubectl apply -f infra/k8s/namespaces/logging-namespace.yaml
kubectl apply -f infra/k8s/namespaces/ingress-namespace.yaml
```

# Grafana / Prometheus 설치
```bash
# Prometheus & Grafana 설치
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  -f infra/k8s/helm/monitoring/prometheus-values.yaml

# Pod 상태 확인
kubectl get pods -l "release=prometheus" -n monitoring
kubectl --namespace monitoring get pods -l "release=prometheus"

# Prometheus와 Grafana 서비스 확인
kubectl get svc -l "release=prometheus" -n monitoring

# Grafana 서비스 확인
kubectl get svc | grep grafana -n monitoring

# Grafana 포트 포워딩
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80

# Prometheus 포트 포워딩
kubectl port-forward svc/prometheus-kube-prometheus-prometheus -n monitoring 9090:9090
```

# Redis Cluster 설치
```bash
# Redis 클러스터 설치
helm install my-redis bitnami/redis-cluster \
  --namespace database \
  -f infra/k8s/helm/redis/values.yaml

# 비밀번호 설정
export REDIS_PASSWORD=$(kubectl get secret --namespace "database" my-redis-redis-cluster -o jsonpath="{.data.redis-password}" | base64 -d)

# Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=redis-cluster -n database

# 잠시 후 다시 Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=redis-cluster -n database

# 서비스가 성공적으로 동작하면
kubectl apply -f infra/k8s/helm/monitoring/servicemonitors/redis-servicemonitor.yaml

# Pod들의 상세 상태 확인
kubectl describe pods -l app.kubernetes.io/name=redis-cluster -n database

# 영속성 볼륨 확인
kubectl get pv
kubectl get pvc -n database

# Redis 로그 확인 방법
kubectl logs my-redis-redis-cluster-0 -c my-redis-redis-cluster -n database

# Redis 클러스터 제거
helm uninstall my-redis -n database

# Redis 클러스터 상태 확인을 위해 Redis CLI에 접속
kubectl run --namespace database redis-client --rm --tty -i --restart='Never' \
  --env REDIS_PASSWORD=$REDIS_PASSWORD \
  --image docker.io/bitnami/redis-cluster:7.4.1-debian-12-r2 -- \
  redis-cli -h my-redis-redis-cluster -a $REDIS_PASSWORD -c

# 또는 한 번에 클러스터 정보 확인
kubectl run --namespace database redis-client --rm --tty -i --restart='Never' \
  --env REDIS_PASSWORD=$REDIS_PASSWORD \
  --image docker.io/bitnami/redis-cluster:7.4.1-debian-12-r2 -- \
  redis-cli -h my-redis-redis-cluster -a $REDIS_PASSWORD cluster info

# 첫 번째 Pod의 로그 확인
kubectl logs -f my-redis-redis-cluster-0 -c my-redis-redis-cluster -n database

# 클러스터 생성 Job의 상태 확인
kubectl get jobs -l app.kubernetes.io/name=redis-cluster -n database

# Job의 로그 확인
kubectl get pods -l job-name=my-redis-redis-cluster-cluster-creator -n database
kubectl logs -f $(kubectl get pods -l job-name=my-redis-redis-cluster-cluster-creator -n database -o jsonpath='{.items[0].metadata.name}') -n database
```

# PosgreSQL HA 클러스터 설치
```bash
# PostgreSQL HA 클러스터 설치
helm install my-postgresql bitnami/postgresql-ha \
  --namespace database \
  -f infra/k8s/helm/postgresql/values.yaml

# Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=postgresql-ha -n database

# PostgreSQL 비밀번호 설정
export POSTGRES_PASSWORD=$(kubectl get secret --namespace database postgresql-password -o jsonpath="{.data.password}" | base64 -d)
export REPMGR_PASSWORD=$(kubectl get secret --namespace database my-postgresql-postgresql-ha-postgresql -o jsonpath="{.data.repmgr-password}" | base64 -d)

# 서비스 상태 확인
kubectl get svc -l app.kubernetes.io/name=postgresql-ha -n database

# 서비스가 성공적으로 동작하면
kubectl apply -f infra/k8s/helm/monitoring/servicemonitors/postgres-metrics-servicemonitor.yaml
```

# Grafana 데이터 소스 및 대시보드 설정

1. Prometheus 데이터 소스 추가
  1. Grafana UI 접속: http://localhost:3000
  2. 왼쪽 메뉴에서 Configuration > Data Sources 클릭
  3. Add data source 클릭
  4. Prometheus 선택
  5. 다음 설정 입력:
    - Name: Prometheus
    - URL: `http://prometheus-kube-prometheus-prometheus.monitoring.svc.cluster.local:9090`
  6. Save & test 클릭

2. Redis Dashboard 추가:
  1. Grafana에서 +버튼 > Import 클릭
  2. Import via grafana.com: `763` 입력 (Redis Dashbaord ID)
  3. Load 클릭
  4. Prometheus 데이터 소스로 선택
  5. Import 클릭

3. PostgreSQL Dashbaord 추가:
  1. Grafana에서 + 버튼 > Import 클릭
  2. Import via grafana.com: `9628` 입력 (PosgreSQL Dashboard ID)
  3. Load 클릭
  4. Prometheus 데이터 소스로 선택
  5. Import 클릭

### **추가 권장 사항**

#### **1. Alerting 설정**
Prometheus Alertmanager를 설정하여 중요한 이벤트 발생 시 알림을 받을 수 있도록 합니다. 예를 들어, CPU 사용률이 80%를 초과하거나 데이터베이스 연결이 과도하게 증가할 때 알림을 받을 수 있습니다.

**Alertmanager 설정 예시 (`prometheus-values.yaml`에 추가):**
```yaml
alertmanager:
  alertmanagerSpec:
    config:
      global:
        resolve_timeout: 5m
      route:
        receiver: 'slack-notifications'
      receivers:
      - name: 'slack-notifications'
        slack_configs:
        - send_resolved: true
          text: "Alert: {{ .CommonAnnotations.summary }}"
          channel: "#alerts"
          api_url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
```

# EFK 스택 세팅
```bash
# Bitnami Helm 차트 리포지토리 추가
helm repo add bitnami https://charts.bitnami.com/bitnami

# Helm 리포지토리 업데이트
helm repo update

# Elasticsearch 설치 (Bitnami)
helm install elasticsearch bitnami/elasticsearch -f infra/k8s/helm/efk/elasticsearch-values.yaml -n logging

## Pod 상태 확인
kubectl get pods --namespace=logging -l app.kubernetes.io/name=elasticsearch
## 상세 상태 확인
kubectl describe pods -l app.kubernetes.io/name=elasticsearch -n logging
## 서비스 상태 확인
kubectl get svc -l app.kubernetes.io/name=elasticsearch -n logging

## elasticsearch 실행
kubectl port-forward --namespace logging svc/elasticsearch 9200:9200 &
    curl http://127.0.0.1:9200/

## 로그 확인
kubectl logs -f $(kubectl get pods -l app.kubernetes.io/name=elasticsearch -n logging -o jsonpath='{.items[0].metadata.name}')

## 클러스터 상태 확인
kubectl exec -it $(kubectl get pods -l app.kubernetes.io/name=elasticsearch -n logging -o jsonpath='{.items[0].metadata.name}') -n logging -- curl -X GET "localhost:9200/_cluster/health?pretty"

# Fluentd 설치 (Bitnami)
helm install fluentd bitnami/fluentd -f infra/k8s/helm/efk/fluentd-values.yaml -n logging
## Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=fluentd -n logging
## 상세 상태 확인
kubectl describe pods -l app.kubernetes.io/name=fluentd -n logging
## 로그 확인
kubectl logs -f $(kubectl get pods -l app.kubernetes.io/name=fluentd -n logging -o jsonpath='{.items[0].metadata.name}')

# Kibana 설치 (Bitnami)
helm install kibana bitnami/kibana -f infra/k8s/helm/efk/kibana-values.yaml -n logging

helm upgrade --install kibana bitnami/kibana \
    --namespace logging \
    --set elasticsearch.hosts[0]=elasticsearch.logging.svc.cluster.local \
    --set elasticsearch.port=9200

## Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=kibana -n logging
## 상세 상태 확인
kubectl describe pods -l app.kubernetes.io/name=kibana -n logging
## 서비스 상태 확인
kubectl get svc -l app.kubernetes.io/name=kibana -n logging
## 로그 확인
kubectl logs -f $(kubectl get pods -l app.kubernetes.io/name=kibana -n logging -o jsonpath='{.items[0].metadata.name}')

# Elasticsearch Exporter 설치 (Bitnami)
helm install elasticsearch-exporter bitnami/elasticsearch-exporter -f infra/k8s/helm/efk/elasticsearch-exporter-values.yaml -n logging

## Pod 상태 확인
kubectl get pods -l app.kubernetes.io/name=elasticsearch-exporter -n logging
## 상세 상태 확인
kubectl describe pods -l app.kubernetes.io/name=elasticsearch-exporter -n logging
## 로그 확인
kubectl logs -f $(kubectl get pods -l app.kubernetes.io/name=elasticsearch-exporter -n logging -o jsonpath='{.items[0].metadata.name}')

# 포트 포워딩 설정 (UI 접근용)
kubectl port-forward svc/kibana 5601:5601 -n logging
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
