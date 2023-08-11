profile='default'
platform='Docker running on 64bit Amazon Linux 2'
region='us-east-1'

eb create \
    --profile $profile \
    -r $region \
    -c brownomics-api-dev \
    -ix 5 \
    -it t3.medium \
    brownomics-api-dev  --profile brownomics
