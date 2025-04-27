Vagrant.configure('2') do |config|
        config.vm.define "debian" do |debian|
            debian.vm.box = "debian/bookworm64"
            debian.vm.hostname = "debian"
            debian.vm.network "private_network", ip: "192.168.56.11"
            debian.vm.network "forwarded_port", guest: 22, host: 2222
            debian.vm.provider "virtualbox" do |vb|
                vb.memory = 1024
                vb.cpus = 1
            end
            debian.vm.provision "shell", inline: <<-SHELL
                apt-get update
            SHELL

    end
end
