from penzai import pz
from jaxlib import jax
from penzai.example_models import simple_mlp
mlp = pz.nn.initialize_parameters(
    simple_mlp.MLP.from_config([8, 32, 32, 8]),
    jax.random.key(42),
)

# Models and arrays are visualized automatically when you output them from a
# Colab/IPython notebook cell:
mlp
