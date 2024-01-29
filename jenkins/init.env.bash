apt update
apt install git-crypt
apt install npm -y
npm i -g npx
apt install make
apt install -y ca-certificates curl sudo
apt install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce
rm -rf /var/lib/apt/lists/*

curl -L https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-Linux-aarch64 -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

usermod -a -G docker jenkins
echo 'jenkins:jenkins' | chpasswd
echo 'jenkins ALL=NOPASSWD: ALL' >> /etc/sudoers

npm i
sudo service docker start
git-crypt unlock ../key

AEdJVENSWVBUS0VZAAAAAgAAAAAAAAABAAAABAAAAAAAAAADAAAAIBsmgDTbljshUMKkuk/kAAon02DmOvHcTaCM9P84rfiTAAAABQAAAEDFYW2hvoK2l7oK+DeV8i1afWhLI3gtcHBD3gEWhSBmdVg/IGr26Fp/zAXA704Og70YxwxXz1nXBlnqv/VVVIDMAAAAAA==